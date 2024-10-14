import Slider from "react-slick";
import { getContinent } from "../Contient";
import { Orchids } from "../ListOfOrchids";
import OrchidCard from "./MainContent/OrchidCard";

export const RelatedOrchidsSlider = ({ currentOrchid, theme }) => {
  const relatedOrchids = Orchids.filter(
    (orchid) =>
      orchid.Id !== currentOrchid.Id &&
      (orchid.category === currentOrchid.category ||
        orchid.color === currentOrchid.color ||
        getContinent(orchid.origin) === getContinent(currentOrchid.origin))
  ).slice(0, 6);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <div className='slider-container'>
      <Slider {...settings}>
        {relatedOrchids.map((orchid) => {
          return (
            <div>
              <OrchidCard key={orchid.Id} orchid={orchid} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};
