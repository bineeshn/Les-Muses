import { useState, useEffect } from "react";
import { RiAuctionFill } from "react-icons/ri";
import { GiTakeMyMoney } from "react-icons/gi";
import { PiTimerFill } from "react-icons/pi";
import { Caption, PrimaryButton, Button, ProfileCard, Title } from "../shared/Design";
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import moment from "moment";

const ProductCard = ({ item }) => {

	const [timeLeft, setTimeLeft] = useState(moment(item?.lastDate).diff(moment()));
	const isAdmin = useSelector((state) => state.auth.user?.isAdmin);

	useEffect(() => {
		const interval = setInterval(() => {
			// Calculate the remaining time until the future date
			const remainingTime = moment(item?.lastDate).diff(moment());

			// If the countdown is over, clear the interval
			if (remainingTime <= 0) {
				clearInterval(interval);
				setTimeLeft(0);
			} else {
				setTimeLeft(remainingTime);
			}
		}, 1000); // Update every second

		return () => clearInterval(interval); // Cleanup on unmount
	}, [item?.lastDate]);

	return (
		<>
			<div className="bg-neutral-100 text-black shadow-s1 rounded-xl p-3">
				<div className="h-56 relative overflow-hidden">
					<NavLink to={`/products/${item?.id}`}>
						<img src={item?.image} alt={item?.image} className="w-full h-full object-cover rounded-xl hover:scale-105 hover:cursor-pointer transition-transform duration-300 ease-in-out" />
					</NavLink>
					<ProfileCard className="shadow-s1 absolute right-3 bottom-3">
						<RiAuctionFill size={22} className="text-green" />
					</ProfileCard>

					<div className="absolute top-0 left-0 p-2 w-full">
						<div className="flex items-center justify-between">
							{!timeLeft ? (
								<Caption className="text-red-900 bg-red-300 px-3 py-1 text-sm rounded-full">Sold Out</Caption>
							) : (
								<Caption className="text-green-900 bg-green-300 px-3 py-1 text-sm rounded-full">On Stock</Caption>
							)}
							<Caption className="text-green bg-green_100 px-3 py-1 text-sm rounded-full">{item?.totalBids} Bids</Caption>
						</div>
					</div>
				</div>
				<div className="details mt-4">
					<Title className="uppercase">{item.title}</Title>
					<div className="flex items-start flex-col py-4 gap-2">	
						<div className="flex items-center justify-between gap-5">
							<div>
								<GiTakeMyMoney size={30} className="text-red-500" />
							</div>
							<div>
								<Caption className="text-red-500">Initial Bid</Caption>
								<Title>₹{item?.price}</Title>
							</div>
						</div>
						<div className="flex items-center justify-between gap-5">
							<div>
								<RiAuctionFill size={30} className="text-green-600" />
							</div>
							<div>
								<Caption className="text-green-600">Current Bid</Caption>
								<Title>₹{item?.bprice}</Title>
							</div>
						</div>
						<div className="flex items-center justify-between gap-5">
							<div>
								<PiTimerFill size={30} className="text-black-600" />
							</div>
							<div>
								{timeLeft ? `${String(moment.duration(timeLeft).days()).padStart(2, "0")} days ${String(moment.duration(timeLeft).hours()).padStart(2, "0")}:${String(moment.duration(timeLeft).minutes()).padStart(2, "0")}:${String(moment.duration(timeLeft).seconds()).padStart(2, "0")}`:"Expired"}
							</div>
						</div>
					</div>
					<hr className="mb-3" />

					<div className="flex items-center justify-center mt-3">
						{isAdmin?
							<PrimaryButton className="rounded-lg text-sm">Edit</PrimaryButton> :
							timeLeft ? 
							<NavLink to={`/products/${item?.id}`}>
								<PrimaryButton className="rounded-lg text-sm">Place Bid</PrimaryButton>
							</NavLink> :
							<Button className="bg-red-400 hover:bg-red-600 rounded-lg text-sm">Sold Out</Button>
						}
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductCard;
