import React from "react";
import SavedMovies from "../components/SavedMovies";

const Account = () => {
  return (
    <>
      <div className="w-full text-white relative">
        <img
          className="w-full h-[400px] object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/b321426e-35ae-4661-b899-d63bca17648a/4eb4e01e-2723-438e-bf4a-a17a19760663/ID-en-20220926-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="/"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-[550px]"></div>
        <div className="absolute top-[30%] p-4 md:p-8">
          <h1 className="text-4xl md:text-5xl font-bold">My Movies</h1>
        </div>
      </div>
      <SavedMovies title="Netflix Originals" isLargeRow={true} />
      <SavedMovies title="Movies" />
    </>
  );
};

export default Account;
