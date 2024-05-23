// on click and selcting form dropdown map update

import DeckGL from "@deck.gl/react";

import { useState, useRef, useEffect } from "react";
import ReactMapGL, { NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { GeoJsonLayer } from "@deck.gl/layers";
import { useProvideContext } from "@/context/FilterContext";
import {
  DEFAULT_DISTRICT_LINE_COLOR_GENERAL,
  STATE_COLORS,
  DEFAULT_STATE_LINE_COLOR,
  TRANSPARENT_COLOR,
  PARTY_ALLIANCE_COLORS,
  MAP_TRANSPARENT_NA_COLOR,
  STATE_COORDINATES,
} from "@/utils/constants";
import { useFilterContextValue } from "@/context/FilterContext";
import hexRgb from "hex-rgb";
import Loading from "../Loading";
export default function Map() {
  const windowWidth = window.innerWidth;

  const mapRef = useRef<any>(null);

  const tooltipRef = useRef<any>(null);
  const containerRef = useRef<any>(null);
  const [viewport, setViewport] = useState({
    longitude: windowWidth < 640 ? 78.9629 : 78.9629 + 1,
    latitude: windowWidth < 640 ? 20.5937 : 20.5937 - 5,
    zoom: 3.5,
  });
  const [layers, setLayers] = useState([]);
  const { PCGeojson, ACGeojson, StateGeojson } = useProvideContext(); // PCGeojson: geojson
  const {
    select_sabha,
    mapResult,
    select_state,
    setSelect_state,
    select_constituency,
    setSelect_constituency,
    loading,
  } = useFilterContextValue();

  // const [stateName, setStateName] = useState(select_state);
  // const [selectedConstituency, setSelectedConstituency] = useState(select_constituency);

  useEffect(() => {
    // if (select_sabha === "Lok Sabha") {
    // } else {
    //   if (loading === false) {
    //     //console.log("state at toggle sabha", Object.keys(mapResult), mapResult);
    //     setSelect_state(Object.keys(mapResult)[0]);
    //   }
    // }
    // setLayers([]);
  }, [select_sabha]);

  useEffect(() => {
    if (select_state !== "Select State") {
      const stateCoordinates = STATE_COORDINATES.find(
        (row) => row.state.toUpperCase() === select_state.toUpperCase()
      );

      //console.log("stateCoordinates", stateCoordinates);
      if (!stateCoordinates) return;

      setViewport({
        latitude: stateCoordinates.latitude,
        longitude: stateCoordinates.longitude,
        zoom:
          windowWidth < 800
            ? stateCoordinates.zoom * 0.82
            : stateCoordinates.zoom * 0.82,
      });

      // setStateName(select_state);
      // setLayers([]);
    }
  }, [select_state]);
  useEffect(() => {
    if (
      select_sabha === "Lok Sabha"
        ? select_constituency.pcNo !== -1
        : select_constituency.acNo !== -1
    ) {
      const stateCoordinates = STATE_COORDINATES.find(
        (row) => row.state.toUpperCase() === select_state.toUpperCase()
      );

      //console.log("stateCoordinates", stateCoordinates);
      if (!stateCoordinates) return;

      setViewport({
        latitude: stateCoordinates.latitude,
        longitude: stateCoordinates.longitude,
        zoom:
          windowWidth < 800
            ? stateCoordinates.zoom * 0.82
            : stateCoordinates.zoom * 0.82,
      });

      // setStateName(select_state);
      // setLayers([]);
    }
  }, [select_constituency]);

  useEffect(() => {
    if (!loading && mapResult !== null) {
      // console.log("constituency", select_constituency);
      //console.log("stateName", select_state);
      //console.log("geojson: ", PCGeojson, ACGeojson, StateGeojson);
      let layers = [];

      if (select_sabha === "Lok Sabha") {
        layers = [
          new GeoJsonLayer({
            id: "geojson-layer-2", //@ts-ignore
            data: PCGeojson,
            stroked: true,
            filled: true,
            pickable: true,
            lineWidthScale: 200,
            //@ts-ignore
            getFillColor: (d) => _fillGeoJsonColor(d), //@ts-ignore
            getLineColor: DEFAULT_DISTRICT_LINE_COLOR_GENERAL,
            getLineWidth: select_sabha === "Lok Sabha" ? 10 : 2, //@ts-ignore
            onClick:
              select_constituency.pcNo === -1
                ? ({ object }: any) => _handleMap(object)
                : null,
            // onClick:
            //   select_state === "Select State"
            //     ? ({ object }) => _handleMap(object)
            //     : null,

            updateTriggers: {
              getFillColor: [mapResult, select_constituency], // Trigger update when filter changes
            },
            // transitions: {
            //   getFillColor: {
            //     duration: 5000,
            //     easing: (t: any) => t,
            //   },
            // },
          }),
          new GeoJsonLayer({
            id: "state-geojson-layer-2", //@ts-ignore
            data: StateGeojson,
            stroked: true,
            filled: false,
            lineWidthScale: 600, //@ts-ignore
            getLineColor:
              select_sabha === "Vidhan Sabha"
                ? TRANSPARENT_COLOR
                : DEFAULT_STATE_LINE_COLOR, //@ts-ignore
            getFillColor: TRANSPARENT_COLOR,
            getLineWidth: 4,
          }),
        ];
      } else {
        layers = [
          new GeoJsonLayer({
            id: "geojson-layer-2", //@ts-ignore
            data: ACGeojson,
            stroked: true,
            filled: true,
            pickable: true,
            lineWidthScale: 200,
            //@ts-ignore
            getFillColor: (d) => _fillGeoJsonColor(d), //@ts-ignore
            getLineColor: (d) => fillDefaultLineColor(d), //DEFAULT_DISTRICT_LINE_COLOR_GENERAL, //@ts-ignore
            getLineWidth: 2, //@ts-ignore
            //@ts-ignore
            onClick:
              select_constituency.acNo === -1
                ? ({ object }: any) => _handleMap(object)
                : null,
            updateTriggers: {
              getFillColor: [mapResult, select_constituency], // Trigger update when filter changes
            },
            // transitions: {
            //   getFillColor: {
            //     duration: 5000,
            //     easing: (t: any) => t,
            //   },
            // },
          }),
          new GeoJsonLayer({
            id: "state-geojson-layer-2", //@ts-ignore
            data: StateGeojson,
            stroked: true,
            filled: false,
            lineWidthScale: 600, //@ts-ignore
            getLineColor: DEFAULT_STATE_LINE_COLOR, //@ts-ignore
            getFillColor: TRANSPARENT_COLOR,
            getLineWidth: 4,
          }),
        ];
      }

      //console.log("layers", layers);

      if (tooltipRef.current) {
        tooltipRef.current.style.display = "none";
        tooltipRef.current.innerHTML = "";
      }
      //@ts-ignore
      setLayers(layers);
    }
  }, [PCGeojson, ACGeojson, StateGeojson, mapResult, select_constituency]); //don't have api to get select_constituency map data that why we put select_constituency here

  //console.log(process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN);
  function fillDefaultLineColor(d: any) {
    // console.log(d.properties.ST_NAME.toUpperCase(), select_state.toUpperCase());
    if (d.properties.ST_NAME.toUpperCase() === select_state.toUpperCase()) {
      return "#000";
    } else {
      return "lightgray";
    }
  }
  function _handleMap(object: any) {
    //console.log("onclick called", object);
    const stateName = object.properties.ST_NAME;

    if (select_sabha === "Lok Sabha") {
      if (select_state === "Select State") {
        // const stateName = object.properties.ST_NAME;
        // const stateCoordinates = STATE_COORDINATES.find(
        //   (row) => row.state === stateName
        // );

        // //console.log("stateCoordinates", stateCoordinates);
        // if (!stateCoordinates) return;
        // setStateName(stateName);
        // setViewport({
        //   latitude: stateCoordinates.latitude,
        //   longitude: stateCoordinates.longitude,
        //   zoom: stateCoordinates.zoom,
        // });
        // setLayers([]);
        setSelect_state(stateName);
      } else if (select_constituency.pcNo === -1) {
        if (stateName.toUpperCase() === select_state.toUpperCase()) {
          setSelect_constituency({
            pcNo: object.properties.PC_NO,
            pcName: object.properties.PC_NAME,
          });
        }
      }
    } else {
      if (select_state === "Select State") {
        // const stateName = object.pro/perties.ST_NAME;
        // const stateCoordinates = STATE_COORDINATES.find(
        //   (row) => row.state === stateName
        // );

        // //console.log("stateCoordinates", stateCoordinates);
        // if (!stateCoordinates) return;
        // setStateName(stateName);
        // setViewport({
        //   latitude: stateCoordinates.latitude,
        //   longitude: stateCoordinates.longitude,
        //   zoom: stateCoordinates.zoom,
        // });
        // setLayers([]);

        setSelect_state(stateName);
      } else if (select_constituency.acNo === -1) {
        if (stateName.toUpperCase() === select_state.toUpperCase()) {
          const constit =
            mapResult[object.properties.ST_NAME][object.properties.AC_NO];
          setSelect_constituency({
            acNo: object.properties.AC_NO,
            acName: constit.acName,
          });
        }
      }
    }
  }
  const _fillGeoJsonColor = (d: any) => {
    let obj = null,
      stateName = select_state;
    // //console.log("_fillGeoJsonColor", d);
    // //console.log("mapResult", mapResult, d);
    // for (let key in mapResult) {
    // For PC
    if (select_sabha === "Lok Sabha") {
      if (
        mapResult &&
        mapResult[d.properties.ST_NAME] &&
        mapResult[d.properties.ST_NAME][d.properties.PC_NO]
      ) {
        // //console.log("mapResult", stateName, d.properties.ST_NAME);
        // for single state selection only fill color
        if (
          stateName !== "Select State" &&
          stateName.toUpperCase() !== d.properties.ST_NAME.toUpperCase()
        ) {
          // obj = null;
        } else {
          //console.log("mapResult", "no state selected", stateName, d);
          // for single constitency selection only fill color

          //constituency selected but not correct
          // //console.log(
          //   "mapResult",
          //   select_constituency,
          //   d.properties,
          //   " ",
          //   // mapResult[d.properties.ST_NAME],
          //   // select_constituency,
          //   mapResult[d.properties.ST_NAME][d.properties.PC_NO].pcNo !==
          //     select_constituency.pcNo
          // );
          if (
            select_constituency.pcNo !== -1 &&
            mapResult[d.properties.ST_NAME][d.properties.PC_NO].pcNo !==
              select_constituency.pcNo
          ) {
            obj = null;
          } else {
            //console.log(
            //   "mapResult",
            //   "no constituency selected",
            //   mapResult[d.properties.ST_NAME][d.properties.PC_NO]
            // );
            obj = mapResult[d.properties.ST_NAME][d.properties.PC_NO];
          }
        }
        // break;
      }
    }
    // For AC
    else {
      //console.log("AC", mapResult, d.properties);
      if (
        mapResult
        // &&
        // mapResult[d.properties.ST_NAME] &&
        // mapResult[d.properties.ST_NAME][d.properties.AC_NO]
      ) {
        // //console.log("mapResult", stateName, d.properties.ST_NAME);
        // for single state selection only fill color
        if (
          stateName !== "Select State" &&
          stateName.toUpperCase() !== d.properties.ST_NAME.toUpperCase()
        ) {
          // obj = null;
        } else {
          // //console.log("mapResult", "no state selected");
          // for single constitency selection only fill color

          //constituency selected but not correct
          //console.log(
          //   "mapResult",
          //   select_constituency,
          //   d.properties,
          //   " ",
          //   // mapResult[d.properties.ST_NAME],
          //   // select_constituency,
          //   mapResult[d.properties.ST_NAME][d.properties.AC_NO].acNo !==
          //     select_constituency.acNo
          // );
          if (
            select_constituency.acNo !== -1 &&
            mapResult[d.properties.ST_NAME][d.properties.AC_NO].acNo !==
              select_constituency.acNo
          ) {
            obj = null;
          } else {
            //console.log(
            //   "mapResult",
            //   "no constituency selected",
            //   mapResult[d.properties.ST_NAME][d.properties.AC_NO]
            // );
            obj = mapResult[d.properties.ST_NAME][d.properties.AC_NO];
          }
        }
        // break;
      }
    }

    // }

    // console.log("obj", obj);
    let rgba = [];
    if (obj) {
      let party = "",
        maxVotes = 0;
      for (let p in obj.voteShare) {
        if (obj.voteShare[p] > maxVotes) {
          maxVotes = obj.voteShare[p];
          party = p;
        }
      } //@ts-ignore
      //console.log("party", party, maxVotes);
      if (PARTY_ALLIANCE_COLORS[party])
        //@ts-ignore
        rgba = hexRgb(PARTY_ALLIANCE_COLORS[party], {
          format: "array",
          alpha: 255,
        });
      else
        rgba = [
          MAP_TRANSPARENT_NA_COLOR.red,
          MAP_TRANSPARENT_NA_COLOR.green,
          MAP_TRANSPARENT_NA_COLOR.blue,
          MAP_TRANSPARENT_NA_COLOR.alpha,
        ];
    } else {
      //   const rgba = hexRgb(STATE_COLORS[Math.floor(Math.random() * 3)], {
      //     format: "array",
      //     alpha: 255,
      //   });
      //   rgba = [
      //     MAP_TRANSPARENT_NA_COLOR.red,
      //     MAP_TRANSPARENT_NA_COLOR.green,
      //     MAP_TRANSPARENT_NA_COLOR.blue,
      //     MAP_TRANSPARENT_NA_COLOR.alpha,
      //   ];

      rgba = [255, 255, 255, 0];
      // //console.log("no obj when pc_no -1");
    }
    // let rgba = [];

    // //console.log(rgba);
    return rgba;
  };

  const _getTooltip = ({ object, x, y }: any) => {
    if (tooltipRef.current) {
      tooltipRef.current.style.display = "none";
      tooltipRef.current.innerHTML = "";
    }

    const tooltip = tooltipRef.current;
    if (!object && !tooltip) {
      tooltip.style.display = "none";
      return null;
    }

    // Set tooltip position
    let tooltipWidth = 350; //tooltip.offsetWidth;
    let tooltipHeight = 300; //tooltip.offsetHeight; //300;
    const margin = 10;

    // Adjust x to center the tooltip horizontally
    // x -= tooltipWidth / 2 - tooltipWidth;

    // console.log("x", x, tooltipWidth, containerRef.current.clientWidth);
    // Adjust for screen boundaries
    if (x + tooltipWidth > containerRef.current.clientWidth) {
      // x = containerRef.current.clientWidth - tooltipWidth - margin;

      x -= tooltipWidth - margin; // + tooltipWidth;
    } else {
      x += margin;
    }
    // if (x < margin) x = margin;

    // Adjust y to place the cursor at the top-center of the tooltip
    y += margin;
    if (y + tooltipHeight > containerRef.current.clientHeight) {
      y = y - tooltipHeight - margin; //tooltipHeight / 2;
    }

    if (object && mapResult) {
      if (select_sabha === "Lok Sabha") {
        let results = null,
          stateName = select_state;
        if (
          mapResult[object.properties.ST_NAME] &&
          mapResult[object.properties.ST_NAME][object.properties.PC_NO]
        ) {
          if (
            stateName !== "Select State" &&
            stateName.toUpperCase() !== object.properties.ST_NAME.toUpperCase()
          ) {
          } else {
            //console.log("tooltip correct state");
            if (
              select_constituency.pcNo !== -1 &&
              mapResult[object.properties.ST_NAME][object.properties.PC_NO]
                .pcNo !== select_constituency.pcNo
            ) {
              results = null;
            } else {
              results =
                mapResult[object.properties.ST_NAME][object.properties.PC_NO];
            }
          }
          // break;
        }

        if (results) {
          let voteShare = "";

          for (let p in results.voteShare) {
            voteShare =
              voteShare +
              ` <p>
              <span class="font-[600] text-[12px]">
                ${p} <span class="px-3">:</span>
              </span>
              <span class="text-[gray] text-[12px]">${results.voteShare[p]}%</span>
            </p>`;
          }

          // Set tooltip content
          tooltipRef.current.innerHTML = `
            <div id="tooltip-1" class="bg-white p-0 pt-0 rounded-lg w-fit min-w-[250px]  ">
            <p class="bg-[#fff9e0] rounded-md p-2.5 pl-3 text-[14px] ">
              <span class="font-[600]">${results.state}</span>
            </p>
            <div class="flex flex-col gap-1 text-[gray] pb-3 pt-2 px-4">
              <p class="flex text-[13px] ">
                <span class="flex justify-between min-w-[100px] max-w-[100px]">Constituency  <span class="pr-2 ">:</span></span>
                <span class="text-black flex-1 font-[600]">
                  ${results.pcName}
                </span>
              </p>
              <p class="flex   text-[13px]">
                <span class="flex justify-between min-w-[100px] max-w-[100px]">Winner <span class="pr-2">:</span></span>
                <span class="text-black  font-[600]">
                   ${results.winner}
                </span>
              </p>
            </div>
            <div class="flex flex-col gap-0   pt-0 pb-3 px-5">
              <span class="font-[600] pb-1">
                Vote Share<span class="px-2">:</span>
              </span>
            <div>
            ${voteShare}</div>
            </div>
            <div>
              `;
          // Set tooltip position
          tooltip.style.left = `${x}px`;
          // tooltip.style.right = `${-10}px`;
          tooltip.style.top = `${y}px`;
          tooltip.style.display = "block"; // Show the tooltip

          return null; // DeckGL won't render its own tooltip
        }
      } else {
        let results = null,
          stateName = select_state;
        if (
          mapResult[object.properties.ST_NAME] &&
          mapResult[object.properties.ST_NAME][object.properties.AC_NO]
        ) {
          if (
            stateName &&
            stateName.toUpperCase() !== object.properties.ST_NAME.toUpperCase()
          ) {
          } else {
            if (
              select_constituency.acNo !== -1 &&
              mapResult[object.properties.ST_NAME][object.properties.AC_NO]
                .acNo !== select_constituency.acNo
            ) {
              results = null;
            } else {
              results =
                mapResult[object.properties.ST_NAME][object.properties.AC_NO];
            }
          }
          // break;
        }

        if (results) {
          let voteShare = "";

          for (let p in results.voteShare) {
            voteShare =
              voteShare +
              ` <p>
              <span class="font-[600] text-[12px]">
                ${p} <span class="px-3">:</span>
              </span>
              <span class="text-[gray] text-[12px]">${results.voteShare[p]}%</span>
            </p>`;
          }
          // Set tooltip content
          tooltipRef.current.innerHTML = `
            <div class="bg-white p-0 pt-0 rounded-lg w-fit min-w-[250px] ">
            <p class="bg-[#fff9e0] rounded-md p-2.5 pl-3 text-[14px] ">
              <span class="font-[600]">${results.state}</span>
            </p>
            <div class="flex flex-col gap-1 text-[gray] pb-3 pt-2 px-4">
              <p class="flex   text-[13px]">
                <span class="flex justify-between min-w-[100px] max-w-[100px]">Constituency  <span class="pr-2 ">:</span></span>
                <span class="text-black flex-1 font-[600]">
                  ${results.acName}
                </span>
              </p>
              <p class="flex   text-[13px]">
                <span class="flex justify-between min-w-[100px] max-w-[100px]">Winner <span class="pr-2">:</span></span>
                <span class="text-black  font-[600]">
                   ${results.winner}
                </span>
              </p>
            </div>
            <div class="flex flex-col gap-0   pt-0 pb-3 px-5">
              <span class="font-[600] pb-1">
                Vote Share<span class="px-2">:</span>
              </span>
            <div>
            ${voteShare}</div>
            </div>
            <div>
              `;
          // Set tooltip position
          tooltip.style.left = `${x}px`;
          tooltip.style.top = `${y}px`;
          tooltip.style.display = "block"; // Show the tooltip

          return null; // DeckGL won't render its own tooltip
        }
      }
    }
  };

  //   just on drag add dragging cursor
  const _getCursor = (e: any) => {
    return e.isHovering ? (e.isDragging ? "grabbing" : "pointer") : "";
  };
  const handleZoomIn = () => {
    setViewport((prevViewport) => ({
      ...prevViewport,
      zoom: Math.min(prevViewport.zoom + 1, 20), // Limit max zoom level to 20
    }));
  };

  const handleZoomOut = () => {
    setViewport((prevViewport) => ({
      ...prevViewport,
      zoom: Math.max(prevViewport.zoom - 1, 0), // Limit min zoom level to 0
    }));
  };
  const [isRendering1, setIsRendering1] = useState(false);
  const [isRendering2, setIsRendering2] = useState(false);
  const handleResetToInitial = () => {
    if (select_sabha === "Lok Sabha") {
      setViewport(
        isRendering1
          ? {
              longitude: windowWidth < 640 ? 78.9629 : 78.9629 + 1,
              latitude: windowWidth < 640 ? 20.5937 : 20.5937 - 5,
              zoom: 3.5,
            }
          : {
              longitude: windowWidth < 640 ? 78.9629 : 78.9629 + 1,
              latitude: windowWidth < 640 ? 20.5937 : 20.5937 - 5,
              zoom: 3.51,
            }
      );
      setIsRendering1((p) => !p);
    } else {
      const stateCoordinates = STATE_COORDINATES.find(
        (row) => row.state.toUpperCase() === select_state.toUpperCase()
      );

      //console.log("stateCoordinates", stateCoordinates);
      if (!stateCoordinates) return;

      setViewport(
        isRendering2
          ? {
              latitude: stateCoordinates.latitude,
              longitude: stateCoordinates.longitude,
              zoom:
                windowWidth < 800
                  ? stateCoordinates.zoom * 0.82
                  : stateCoordinates.zoom * 0.82,
            }
          : {
              latitude: stateCoordinates.latitude,
              longitude: stateCoordinates.longitude,
              zoom:
                windowWidth < 800
                  ? stateCoordinates.zoom * 0.821
                  : stateCoordinates.zoom * 0.82,
            }
      );

      setIsRendering2((p) => !p);
    }
  };

  return (
    <>
      {layers.length > 0 ? (
        <div
          ref={containerRef}
          className="w-full  h-[80vh] md:h-auto md:w-1/2 min-w-[300px] flex-1 z-0 flex justify-end relative  "
        >
          <DeckGL
            initialViewState={viewport}
            layers={layers} //@ts-ignore
            getTooltip={_getTooltip}
            getCursor={(e) => _getCursor(e)}
            mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
            pickingRadius={5}
            controller={true}
            //   width={
            //     windowWidth < 800
            //       ? windowWidth > 700
            //         ? windowWidth * 0.67
            //         : windowWidth * 0.9
            //       : windowWidth * 0.42
            //   }
            //   height={
            //     windowWidth < 800
            //       ? windowWidth > 700
            //         ? windowWidth * 0.8
            //         : windowWidth * 1.15
            //       : windowWidth * 0.44
            //   }
            width="100%"
            height="100%"
            onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
            // mapStyle="mapbox://styles/mapbox/light-v9"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
            reuseMaps
            preventStyleDiffing={true}
            attributionControl={false}
            // onWheel={(e: any) => {
            //   console.log("onWheel", e);
            // }}
          >
            <ReactMapGL
              // ref={mapRef}
              // layers={layers}
              // initialViewState={...viewport}
              // width="100%"
              // height="100%"
              // onViewportChange={(nextViewport: any) =>
              //   setViewport(nextViewport)
              // }
              mapStyle="mapbox://styles/mapbox/light-v9"
              mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
              reuseMaps
              // preventStyleDiffing={true}
              // attributionControl={false}
            ></ReactMapGL>

            <div id="map" className="absolute z-50 bottom-0 left-0">
              <div className="mapbox-attribution-container relative flex row-reverse">
                <div
                  className="flex justify-start"
                  style={{ placeItems: "baseline" }}
                >
                  <img
                    src={`/dhruv_logo.jpg`}
                    alt="copyright newsclick dot in"
                    className="w-28"
                  />
                </div>
              </div>
            </div>
            <div className="absolute z-50 top-0 left-0 ">
              <div className="mapbox-attribution-container relative flex row-reverse">
                <div className="flex items-center px-5 py-2 bg-white border  ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 192 512"
                    fill="rgb(107 114 128)"
                    className="w-5 h-5 border-2 border-gray-500  cursor-pointer  rounded-full p-[4px]"
                  >
                    <path d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z" />
                  </svg>
                  <span className="ml-2 text-sm text-gray-500">
                    Hover on Map to view details
                  </span>
                </div>
              </div>
            </div>
          </DeckGL>

          {/* zoom buttons */}
          <div
            style={{
              position: "absolute",
              right: 15,
              top: 10,
              // border: "1px solid rgba(0, 0, 0, .7)",
              display: "flex",
              flexDirection: "column",
              zIndex: 2,

              borderRadius: "5px",
              boxShadow: "0 0 0 1.5px rgba(0, 0, 0, .3)",
            }}
          >
            <button
              className="py-[5px] px-2 bg-white rounded-t-md hover:bg-gray-100"
              onClick={handleZoomIn}
            >
              <svg
                fill="rgba(0, 0, 0, .7)"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width="18px"
                height="18px"
              >
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
              </svg>
            </button>
            <button
              className="py-[4px] px-2 bg-white border-t-[2px] border-gray-300 border-b-[2px] hover:bg-gray-100"
              onClick={handleZoomOut}
            >
              <svg
                fill="rgba(0, 0, 0, .7)"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width="18px"
                height="18px"
              >
                {" "}
                <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
              </svg>
            </button>
            <button
              className="py-[5px] px-2 bg-white rounded-b-md hover:bg-gray-100"
              onClick={handleResetToInitial}
            >
              <svg
                fill="rgba(0, 0, 0, .7)"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                width="18px"
                height="18px"
              >
                {" "}
                <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
              </svg>
            </button>
          </div>

          {/* tooltip */}
          <div
            ref={tooltipRef}
            className="absolute z-[1000]  text-black w-full h-full "
          ></div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

/* <DeckGL
layers={layers}
initialViewState={viewport}
controller={true}
mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
>
<ReactMapGL
  layers={layers}
  mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
  {...viewport}
  mapStyle="mapbox://styles/mapbox/light-v9"
/>
</DeckGL> */
