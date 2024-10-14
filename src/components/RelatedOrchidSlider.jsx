import React from "react";
import Slider from "react-slick";
import { getContinent } from "../Continent";
import { Orchids } from "../ListOfOrchids";
import OrchidCard from "./MainContent/OrchidCard";
import { Typography } from "@mui/material";

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
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div
      className='related-orchids-slider'
      style={{ marginTop: "3rem", paddingBottom: "32px" }}
    >
      <Typography
        variant='h5'
        component='h2'
        sx={{
          mb: 3,
          color: theme.text.primary,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Related Orchids
      </Typography>
      <Slider {...settings}>
        {relatedOrchids.map((orchid) => (
          <div key={orchid.Id} style={{ padding: "0 10px" }}>
            <OrchidCard orchid={orchid} theme={theme} />
          </div>
        ))}
      </Slider>
      <style jsx global>{`
        .related-orchids-slider .slick-list {
          margin: 0 -10px;
        }
        .related-orchids-slider .slick-slide > div {
          margin: 0 10px;
        }
        .related-orchids-slider .slick-dots li button:before {
          color: ${theme.text.primary};
          opacity: 0.25;
          font-size: 10px;
        }
        .related-orchids-slider .slick-dots li.slick-active button:before {
          color: ${theme.text.primary};
          opacity: 0.75;
        }
        .related-orchids-slider .slick-prev,
        .related-orchids-slider .slick-next {
          z-index: 1;
        }
        .related-orchids-slider .slick-prev {
          left: -25px;
        }
        .related-orchids-slider .slick-next {
          right: -25px;
        }
        .related-orchids-slider .slick-prev:before,
        .related-orchids-slider .slick-next:before {
          color: ${theme.text.primary};
        }
      `}</style>
    </div>
  );
};
