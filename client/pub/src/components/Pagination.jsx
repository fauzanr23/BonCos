
export default function Pagination({page, totalPages, setPage, totalData, dataPerPage}) {
  const currentData = dataPerPage * page

  return (
    <>
    <div className="w-full bg-linear-to-b to-orange-50 from-amber-50 py-6 flex flex-col items-center">
    <div className="flex justify-center items-center">
      <p>{currentData >= totalData? totalData: currentData} out of {totalData} entries</p>

    </div>
      <div className="join mb-5">
        <button className="join-item btn" onClick={() => {
          page > 1 && setPage(page - 1) 
        }} disabled={page === 1}>«</button>
        <button className="join-item btn" onClick={() => {setPage(1)}}>1</button>
        <button className="join-item btn">Page {page} : {totalPages}</button>
        <button className="join-item btn"onClick={() => {setPage(totalPages)}}>{totalPages}</button>
        <button className="join-item btn" onClick={() => {
          page < totalPages && setPage(page + 1) 
        }} disabled={page === totalPages}>»</button>
      </div>

    </div>
    </>
  );
}
