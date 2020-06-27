"use strict";

const range = document.querySelector(".navigation__range"),
  horizontalContainer = document.querySelector(".page3__slides-container"),
  verticalContainer = document.querySelector(".pages__container"),
  pagginationPoints = document.querySelectorAll(".paggination__point"),
  page1Value = 25,
  page3Value = 75,
  rangeStartValue = +0,
  rangeMiddleValue = +50,
  ranfeEndValue = +100,
  scrollToSlide1 = +0,
  scrollToSlide2 = +1024,
  scrollToSlide3 = +2048,
  scrollToPage1 = +0,
  scrollToPage2 = +768,
  scrollToPage3 = +1536;

//автоматический переход бегунка к начальному/среднему/конечному значению
const horizontalSliderPagg = () => {
  if (range.value > page1Value && range.value < page3Value) {
    range.value = rangeMiddleValue;
  }
  if (range.value <= page1Value) {
    range.value = rangeStartValue;
  }
  if (range.value >= page3Value) {
    range.value = ranfeEndValue;
  }
};

//преключение слайдов и бегунка на горизонтальном слайдере
const horizontalSliderToggle = () => {
  //изменение положения бегунка при переключении слайдов
  const toggleContainer = () => {
    let horContainerScrll = horizontalContainer.scrollLeft;
    if (horContainerScrll === scrollToSlide1) {
      range.value = +0;
    }
    if (horContainerScrll === scrollToSlide2) {
      range.value = +50;
    }
    if (horContainerScrll === scrollToSlide3) {
      range.value = +100;
    }
    console.log();
  };
  //изменнение слайдов при переключении бегунка
  const toggleRange = function () {
    if (range.value <= page1Value) {
      horizontalContainer.scrollTo({
        left: scrollToSlide1,
        behavior: "smooth",
      });
    }
    if (range.value > page1Value && range.value < page3Value) {
      horizontalContainer.scrollTo({
        left: scrollToSlide2,
        behavior: "smooth",
      });
    }
    if (range.value >= page3Value) {
      horizontalContainer.scrollTo({
        left: scrollToSlide3,
        behavior: "smooth",
      });
    }
  };

  horizontalContainer.addEventListener("scroll", toggleContainer);
  range.addEventListener("touchmove", toggleRange, { passive: true });
};

//вертикальная паггинация
const pointsToggle = () => {
  let scrollPages = verticalContainer.scrollTop;

  const orangePoint = (elem) => {
    elem.classList.add("paggination__point--orange");
  };

  const whitePoint = (elem) => {
    elem.classList.remove("paggination__point--orange");
  };

  if (scrollPages >= scrollToPage1 && scrollPages < scrollToPage2 / 2) {
    orangePoint(pagginationPoints[0]);
  } else {
    whitePoint(pagginationPoints[0]);
  }
  if (
    scrollPages >= scrollToPage2 / 2 &&
    scrollPages <= scrollToPage2 / 2 + scrollToPage3 / 2
  ) {
    orangePoint(pagginationPoints[1]);
  } else {
    whitePoint(pagginationPoints[1]);
  }
  if (
    scrollPages > scrollToPage2 / 2 + scrollToPage3 / 2 &&
    scrollPages <= scrollToPage3
  ) {
    orangePoint(pagginationPoints[2]);
  } else {
    whitePoint(pagginationPoints[2]);
  }
};

range.addEventListener("touchend", horizontalSliderPagg, { passive: true });
verticalContainer.addEventListener("scroll", pointsToggle);

horizontalSliderToggle();
