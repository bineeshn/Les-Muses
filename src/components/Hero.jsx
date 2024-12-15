import { Body, Caption, Container, Title } from "./shared/Design";
import { AiOutlinePropertySafety } from "react-icons/ai";
import PropTypes from "prop-types";
export const User1 = "https://cdn-icons-png.flaticon.com/128/6997/6997662.png";
export const User2 = "https://cdn-icons-png.flaticon.com/128/236/236832.png";
export const User3 = "https://cdn-icons-png.flaticon.com/128/236/236831.png";
export const User4 = "https://cdn-icons-png.flaticon.com/128/1154/1154448.png";

export const Hero = () => {
	return (
		<>
			<section className="hero min-h-[80vh] bg-primary py-8 flex items-center justify-center">
				<Container className="flex items-center justify-between md:flex-row flex-col">
					<div className="w-full md:w-1/2 text-white pr-12">
						<Title level={3} className="text-white">
							Collect digital items.
						</Title>
						<Body className="leading-7 text-gray-200 my-8">
							Nulla facilisi. Maecenas ac tellus ut ligula interdum convallis. Nullam dapibus on erat in dolor posuere, none hendrerit lectus ornare. Suspendisse sit amet turpina sagittis, ultrices
							dui et, aliquam urna.
						</Body>
					</div>
					<div className="w-full md:w-1/2 my-16 relative py-16">
						{/* <img src="../images/home/hero.webp" alt="" />
						<div className="horiz-move absolute md:top-28 top-8 left-0">
							<Box title="Proof of quality" desc="Lorem Ipsum Dolar Amet" />
						</div>
						<div className="horiz-move absolute bottom-72 right-0">
							<Box title="Safe and secure" desc="Lorem Ipsum Dolar Amet" />
						</div> */}
					</div>
				</Container>
			</section>
		</>
	);
};

const Box = ({ title, desc }) => {
	return (
		<>
			<div className="px-5 py-4 bg-white shadow-md flex items-center gap-5 rounded-xl w-auto">
				<div className="w-14 h-14 bg-green_100 flex items-center justify-center rounded-full">
					<AiOutlinePropertySafety size={27} className="text-primary" />
				</div>
				<div>
					<Title>{title}</Title>
					<Caption>{desc}</Caption>
				</div>
			</div>
		</>
	);
};

Box.propTypes = {
	title: PropTypes.any,
	desc: PropTypes.any,
};
