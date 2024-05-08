import clsx from "clsx";

export default function Filter({
  filter,
  sortTable,
  setFilter,
  setCurrentData,
  currentData,
}: {
  filter: string;
  sortTable: Function;
  setFilter: Function;
  setCurrentData: Function;
  currentData: any;
}) {
  const handleClick = (v: string) => {
    setCurrentData(sortTable(currentData, v));
    setFilter(v);
  };
  return (
    <div className="absolute   md:top-10 right-0  text-[1.2rem] text-[gray]">
      {filter !== "candidate" ? (
        <span
          onClick={() => handleClick("candidate")}
          className={clsx("text-[.8rem] md:text-[1rem]", {
            "text-black font-semibold": filter === "candidate",
          })}
        >
          candidate
        </span>
      ) : (
        <span
          className={clsx("text-[.8rem] md:text-[1rem]", {
            "text-black font-semibold": filter === "candidate",
          })}
        >
          candidate
        </span>
      )}
      <span> | </span>
      {filter === "candidate" ? (
        <span
          onClick={() => handleClick("party")}
          className={clsx("text-[.8rem] md:text-[1rem]", {
            //@ts-ignore
            "text-black font-semibold": filter === "party",
          })}
        >
          Party
        </span>
      ) : (
        <span
          className={clsx("text-[.8rem] md:text-[1rem]", {
            "text-black font-semibold": filter === "party",
          })}
        >
          Party
        </span>
      )}
    </div>
  );
}
