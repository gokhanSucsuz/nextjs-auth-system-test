import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from "@/components/ui/carousel";
import Image from "next/image";

const photos = [
	"https://images.pexels.com/photos/29134354/pexels-photo-29134354/free-photo-of-bulutlu-gokyuzu-altinda-manzarali-yamac-koyu.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	"https://images.pexels.com/photos/29107012/pexels-photo-29107012/free-photo-of-lofoten-norvec-teki-dogal-nusfjord-koyu.jpeg?auto=compress&cs=tinysrgb&w=600",
	"https://images.pexels.com/photos/29062581/pexels-photo-29062581/free-photo-of-piknik-masasi-ile-huzurlu-sonbahar-golu-manzarasi.jpeg?auto=compress&cs=tinysrgb&w=600",
	"https://images.pexels.com/photos/29039561/pexels-photo-29039561/free-photo-of-akan-suyla-huzurlu-sonbahar-nehir-manzarasi.jpeg?auto=compress&cs=tinysrgb&w=600"
];

function MySlider() {
	return (
		<Carousel className="flex w-[50%] items-center justify-center">
			<CarouselContent>
				{photos.map((p, index) =>
					<CarouselItem key={index} className="w-full">
						<div className="p-1 ">
							<Card>
								<CardContent className="flex items-center justify-center p-6">
									<Image
										src={p}
										alt={p}
										width={1000}
										height={1000}
										className="min-w-40 rounded-lg object-cover"
									/>
								</CardContent>
							</Card>
						</div>
					</CarouselItem>
				)}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
export default MySlider;
