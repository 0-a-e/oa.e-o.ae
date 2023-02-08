import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./index.css?inline";
import SearchIcon from "~/icons/search";
import FilterIcon from "~/icons/filter";
import SeparateIcon from "~/icons/separate";
import Item from "~/components/blog/item";
import { RequestHandler } from "@builder.io/qwik-city";
import { blogType, getBlogs } from "~/library/getBlog";
import anime from "lib/anime.es.js";

// Core modules imports are same as usual
import { Navigation, Pagination } from 'swiper';
// Direct React component imports
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';

// Styles must use direct files imports
import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; 

export default component$(() => {
  useStylesScoped$(styles);
  const swiper = new Swiper(".bigVideosContainer", {
    // Optional parameters
    direction: "vertical",
    loop: true,
    /*
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },*/
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
    <div class="container">
      <div class="bigVideosContainer">
        <div class="bigVideoContainer">
          <div class="titleContainer">
            <p class="title">
              SP03に
              <br />
              Android4.0を焼く話
            </p>
          </div>
        </div>
      </div>
      <div class="miniVideosContainer">
        {testVideos.map((miniVideo) => {
          return <div class="miniVideoContainer"></div>;
        })}
      </div>
    </div>
  );
});
