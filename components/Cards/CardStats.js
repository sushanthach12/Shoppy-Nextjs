import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

export default function CardStats({
  statSubtitle,
  statTitle,
  routeLink,
  routeLinkName
}) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4 rounded-md">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-blueGray-400 uppercase font-bold text-sm">
                {statSubtitle}
              </h5>
              <span className="font-semibold text-xl text-blueGray-700">
                {statTitle}
              </span>
            </div>
            {/* <div className="relative w-auto pl-4 flex-initial">
              <div
                className={
                  "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " +
                  statIconColor
                }
              >
                <i className={statIconName}></i>
              </div>
            </div> */}
          </div>
          <div className="text-sm text-blue-400 mt-4">

          <Link href={`/dashboard/admin/${routeLink}`} className='underline'>
            {routeLinkName}
          </Link>
          </div >
        </div>
      </div>
    </>
  );
}