import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import PolygonPrice from '../../public/assets/global-price-polygon.png';
import { Skeleton } from '@mui/material';
import { useResizeDetector } from 'react-resize-detector';
export const NFTCard = (props) => {
  const { metaData } = props;
  const { width, ref } = useResizeDetector({
    handleHeight: false
  });

  return (
    <Link href={metaData?.tokenId ? `/showcase/${metaData.tokenId}` : ''}>
      <a target="_blank" className="w-full">
        <div
          ref={ref}
          className="flex flex-col items-center transition-all hover:scale-105 sm:mb-[20px] mb-[10px] relative cursor-pointer bg-opacity-0 w-full"
        >
          {metaData.loading ? (
            <Skeleton
              animation="wave"
              variant="rectangle"
              width={width || 100}
              height={width || 100}
            />
          ) : (
            <div
              className="shadow-2xl rounded-lg overflow-hidden w-full"
              style={{ height: width }}
            >
              {metaData?.image && (
                <Image
                  className=""
                  src={metaData.image}
                  alt="preview"
                  width={width || 100}
                  height={width || 100}
                />
              )}
            </div>
          )}

          {metaData.loading ? (
            <div className="flex w-full lg:px-5 lg:pt-6 lg:pb-8 px-2 pt-3 pb-3 z-10">
              <Skeleton animation="wave" variant="text" width="100%" />
            </div>
          ) : (
            <div className="flex w-full sm:py-[20px] py-[10px]">
              <div className="flex flex-col w-10/12">
                <p className="sm:text-[16px] text-[14px]  md:text-[18px] font-[500]">
                  {metaData?.name}
                </p>
                <p className="text-[#959595]  md:text-[16px] sm:text-[14px] text-[13px] font-[500] truncate">
                  {metaData?.description}
                </p>
              </div>

              {/* <div className="flex flex-col w-3/12 text-right">
          <div className="text-[#626262] text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] font-[600]">
                Price
              </div>
              <div className="flex items-center justify-end">
                <Image
                  src={PolygonPrice}
                  alt="price"
                  width={11.5}
                  height={18}
                />
                <div className="ml-[5px] text-[10px] sm:text-[12px] md:text-[13px] lg:text-[15px] font-bold">
                  0.02
                </div>
              </div>
        </div> */}
            </div>
          )}
        </div>
      </a>
    </Link>
  );
};

export const NFTLoadingCard = () => {
  const { width, ref } = useResizeDetector({
    handleHeight: false
  });

  return (
    <div
      ref={ref}
      className="flex flex-col items-center  shadow-xl rounded-3xl cursor-pointer transition-all hover:scale-105 mb-[20px] relative overflow-hidden"
    >
      <Skeleton
        animation="wave"
        variant="rectangle"
        width={width || 100}
        height={width || 100}
      />

      <div className="flex w-full lg:px-5 lg:pt-6 lg:pb-8 px-2 pt-3 pb-3 z-10">
        <Skeleton animation="wave" variant="text" width="100%" />
      </div>
    </div>
  );
};
