import {
  component$,
  useClientEffect$,
  useSignal,
  useStylesScoped$,
} from "@builder.io/qwik";
import styles from "./index.css?inline";
import SearchIcon from "~/icons/search";
import FilterIcon from "~/icons/filter";
import SeparateIcon from "~/icons/separate";
import Item from "~/components/blog/item";
import { RequestHandler } from "@builder.io/qwik-city";
import { blogType, getBlogs } from "~/library/getBlog";
import anime from "lib/anime.es.js";

/*

// Core modules imports are same as usual
import { Navigation, Pagination } from 'swiper';
// Direct React component imports
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';

*/

import Swiper from "swiper";
import { Navigation, Pagination, Scrollbar } from "swiper";

/*
// Styles must use direct files imports
import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; 
*/
export default component$(() => {
  useStylesScoped$(styles);

  const containerRef = useSignal<Element>();
  const containerHeight = useSignal<number>(0);

  useClientEffect$(() => {
    if(containerRef.value?.clientHeight && containerRef.value?.clientHeight != 0){
      containerHeight.value = containerRef.value?.clientHeight;
    }
  });

  const testVideos = [
    {
      title: "A",
    },
    {
      title: "B",
    },
    {
      title: "C",
    },
    {
      title: "D",
    },
    {
      title: "E",
    },
  ];
  return (
    <div class="container" ref={containerRef}>
      { (containerHeight.value && containerRef.value?.clientHeight) ? <BigVideoContainer containerHeight={containerHeight.value} /> : <div />}
      <div class="miniVideosContainer">
        {testVideos.map((miniVideo) => {
         return <div class="miniVideoContainer"></div>;
        })}
      </div>
    </div>
  );
});

export const BigVideoContainer = component$(({containerHeight}) => {
  useStylesScoped$(styles);
  const testVideos = [
    {
      title: "A",
    },
    {
      title: "B",
    },
    {
      title: "C",
    },
    {
      title: "D",
    },
    {
      title: "E",
    },
  ];
  useClientEffect$(() => {
    let swiper = new Swiper(".bigVideosContainer", {
      direction: 'vertical',
      autoplay: {
        delay: 5000,
      },
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  });

return (
  <div class="bigVideosContainer" style={{height: containerHeight.toString() + "px"}}>
  <div class="swiper-wrapper">
    {testVideos.map((bigVideo) => {
      return (
        <div class="bigVideoContainer swiper-slide">
          <div class="titleContainer">
            <p class="title">
              {bigVideo.title}
            </p>
          </div>
        </div>
      );
    })}
  </div>
</div>
);
});