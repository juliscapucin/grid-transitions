import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

import Link from "next/link";
import Image from "next/image";

import ids from "./../data/ids";

export default function ProductItem({
  id,
  slug,
  name,
  url,
  setProductPage,
  setShowProductPage,
}) {
  const [clickedProduct, setClickedProduct] = useState(0);
  const refProductItem = useRef(null);
  const router = useRouter();

  return (
    <motion.article
      key={id}
      className='productItem-container'
      initial={id === ids[0] && { zIndex: 98 }}
      animate={id === ids[0] && { zIndex: 98 }}
      exit={
        (id !== clickedProduct && { opacity: 0 },
        id === ids[0] && { zIndex: 98 })
      }
      transition={{ duration: 1 }}
    >
      <motion.div
        ref={refProductItem}
        className='productItem-img-container'
        layout
        layoutId={`${id}`}
        transition={{
          type: "crossfade",
          layout: {
            duration: 0.5,
          },
        }}
        whileHover={{
          scale: 1.08,
          transition: { duration: 0.5 },
        }}
      >
        <div
          className='productItem-img'
          onClick={() => {
            ids[0] = id;
            setClickedProduct(id);
            setProductPage({ name, id, url, slug });
            setShowProductPage(true);
            router.push(`/products/${slug}`, undefined, {
              shallow: true,
            });
          }}
        >
          <img
            // as={motion.div}
            src={url}
            alt={name}
          />
          {/* <Image
              // as={motion.div}
              src={url}
              alt={name}
              layout='fill'
              objectFit='cover'
              objectPosition='center center'
              priority
            /> */}
        </div>
      </motion.div>

      <div className='productItem-text'>
        <Link href={`products/${slug}`}>
          <a>
            <div className='productItem-title-container'>
              <h4>{name}</h4>
            </div>
          </a>
        </Link>
      </div>
    </motion.article>
  );
}
