import { Hero } from "../components/Hero";
import { CategorySection } from "../components/shared/layout/CategorySection";
import { productlists } from "../utils/data";

export const Home = () => {
    return (
      <>
        <Hero />
        <CategorySection title="Trending Items" subtitle="Most viewed and all-time top-selling category" categorylists={productlists} />
      </>
    );
};