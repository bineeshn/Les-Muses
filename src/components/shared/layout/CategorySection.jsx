import { useState, useEffect } from "react";
import AddItem from "../../addItem/AddItem";
import ProductCard from "../../cards/ProductCard";
import { Container, Heading, Button } from "../Design";
import { useLocation } from "react-router-dom";

export const CategorySection = ({ title, subtitle, categorylists, color = "neutral-800" }) => {

	const location = useLocation();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		if (isModalOpen) {
		  document.body.style.overflow = 'hidden'; // Disable scroll
		} else {
		  document.body.style.overflow = ''; // Enable scroll
		}
	
		return () => {
		  document.body.style.overflow = ''; // Clean up on unmount
		};
	  }, [isModalOpen]);

	return (
		<>
			<div className={`bg-${color} bg-neutral-800 w-full py-16 -mt-10 rounded-t-[40px]`}></div>
			<section className={`bg-${color} catgeory-slider pb-16`}>
				<Container>
					<Heading title={title} subtitle={subtitle} />
					{location.pathname !=="/" && <Button  onClick={openModal}>Add Item</Button>}
					<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5 my-8">
						{categorylists.map((item) => (
							<ProductCard item={item} key={item.id} />
						))}
					</div>
				</Container>
			</section>
			<AddItem  isOpen={isModalOpen} closeModal={closeModal}/>
		</>
	);
};
