import { Caption, Container, Title } from "../components/shared/Design";
import { commonClassNameOfInput } from "../components/shared/Design";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { productlists } from "../utils/data";
import moment from "moment";

export const ProductsDetailsPage = () => {
	const [product, setProduct] = useState();
	const [timeLeft, setTimeLeft] = useState(moment(product?.lastDate).diff(moment()));

	const location = useLocation();

	useEffect(() => {
		const itemID = location.pathname.split('/').filter(Boolean).pop();
		const item = productlists.find(item => item.id === +itemID);
		setProduct(item)
	}, [location.pathname])

	useEffect(() => {
		const interval = setInterval(() => {
			// Calculate the remaining time until the future date
			const remainingTime = moment(product?.lastDate).diff(moment());

			// If the countdown is over, clear the interval
			if (remainingTime <= 0) {
				clearInterval(interval);
				setTimeLeft(0);
			} else {
				setTimeLeft(remainingTime);
			}
		}, 1000); // Update every second

		return () => clearInterval(interval); // Cleanup on unmount
	}, [product?.lastDate]);

	const updateBid = (e) =>{
		e.preventDefault();
		setProduct({...product, bprice: +e.target[0].value})
	}


	return (
		<>
			<section className="pt-24 px-8">
				{!product ? <div className="flex justify-center items-center h-full  min-h-[80vh]">
					<div className="w-16 h-16 border-4 border-gold border-dotted rounded-full animate-spin"></div>
				</div> :
					<Container>
						<div className="flex justify-between gap-8">
							<div className="w-1/2">
								<div className="h-auto max-h-[50vh]">
									<img src={product?.image} alt="" className="w-full h-full object-cover rounded-xl" />
								</div>
							</div>
							<div className="w-1/2">
								<Title level={2} className="capitalize">
									{product?.title}
								</Title>
								<br />
								<Caption>Item condition: {product?.condition}</Caption>
								<br />
								{timeLeft ? <>
									<Caption>Time left:</Caption>
									<div className="flex gap-2 text-center">
										<div className="p-3 px-10 shadow-s1">
											<Title level={4}>{String(moment.duration(timeLeft).days()).padStart(2, "0")}</Title>
											<Caption>Days</Caption>
										</div>
										<div className="p-3 px-10 shadow-s1">
											<Title level={4}>{String(moment.duration(timeLeft).hours()).padStart(2, "0")}</Title>
											<Caption>Hours</Caption>
										</div>
										<div className="p-3 px-10 shadow-s1">
											<Title level={4}>{String(moment.duration(timeLeft).minutes()).padStart(2, "0")}</Title>
											<Caption>Minutes</Caption>
										</div>
										<div className="p-3 px-10 shadow-s1">
											<Title level={4}>{String(moment.duration(timeLeft).seconds()).padStart(2, "0")}</Title>
											<Caption>Seconds</Caption>
										</div>
									</div>
									<br /> </> : ""}
								<Title className="flex items-center gap-2">
									Auction ends:
									<Caption>{moment(product?.lastDate).format('MMMM Do YYYY, h:mm:ss a')}</Caption>
								</Title>
								<Title className="flex items-center gap-2 my-5">
									Price:<Caption className="text-[18px] font-[600] text-white">₹{product.price}</Caption>
								</Title>
								<Title className="flex items-center gap-2">
									Current bid:<Caption className="text-[18px] font-[600] text-green-400">₹{product.bprice}</Caption>
								</Title>
								{timeLeft ? <div className="p-5 shadow-s3 mt-2">
									<form onSubmit={updateBid} className="flex gap-3 justify-between">
										<input className={commonClassNameOfInput} type="number" name="price" placeholder="Your Bid" min={product.bprice+1} />
										<button type="submit" className={`py-3 px-8 rounded-lg bg-gold text-white`}>
											Submit
										</button>
									</form>
								</div> : ""}
							</div>
						</div>
						<div className="details mt-8">

							<div className="tab-content mt-8">
								<div className="description-tab shadow-s3 p-8 rounded-md">
									<Title level={4}>Description</Title>
									<br />
									<Caption className="leading-7">
										{product?.description}
									</Caption>
									<br />
								</div>
							</div>
						</div>
					</Container>}
			</section>
		</>
	);
};
