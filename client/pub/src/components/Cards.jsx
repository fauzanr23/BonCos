import { rupiahFormat } from "../helpers/RupiahFormat";

export default function CardCuisine({ el }) {
  return (
    <>
      {/* content */}
      <div className="card bg-white shadow-md w-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
        <figure className="h-44 w-full overflow-hidden rounded-t-xl">
          <img
            src={el.imgUrl}
            alt="Food"
            className="w-full h-full object-cover"
          />
        </figure>

        <div className="card-body items-center text-center p-4">
          <h2 className="card-title text-sm font-semibold tracking-wide text-gray-800 line-clamp-1">
            {el.name}
          </h2>

          <p className="text-gray-600 text-sm">{rupiahFormat(el.price)}</p>
        </div>
      </div>
    </>
  );
}
