import { api } from "~/services";
import { ProductCard } from "../_components/product-card";
import { SearchParams } from "nuqs/server";
import { loadSearchParams } from "./search-params";
import { ProductFilter } from "./_components/filter";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { order, search, sortBy } = await loadSearchParams(searchParams);
  const items = await api.products.getAllProducts({ order, search, sortBy });

  return (
    <main className="max-w-5xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
        Product Catalog
      </h1>
      <ProductFilter />
      {items.length === 0 ? (
        <p className="text-center text-lg text-gray-500 mt-10">
          No products found matching your criteria.
        </p>
      ) : (
        <div className="flex flex-col divide-y gap-2 divide-gray-200 dark:divide-gray-700">
          {items.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </main>
  );
}
