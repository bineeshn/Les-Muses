import { CategorySection } from "../components/shared/layout/CategorySection";
import { productlists } from "../utils/data";

const ProductList = () => {
    return (
        <div className="pt-24">
            <CategorySection title="Trending Items" subtitle="Most viewed and all-time top-selling category" categorylists={productlists} />
        </div>
    )
}

export default ProductList;