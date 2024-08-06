"use client";

import { jsx, Link as A } from 'theme-ui';
import NextLink from 'next/link';
import { HiOutlineChevronRight } from 'react-icons/hi';


export function NavLink({ path, label, onClick }) {
  if (!path) {
    console.error('NavLink component requires a valid `path` prop.');
    return null;
  }
  return (
    <NextLink href={path} passHref>
      <A onClick={onClick}>{label}</A>
    </NextLink>
  );
}

export function Link({ path, label, children, ...rest }) {
  if (!path) {
    console.error('Link component requires a valid `path` prop.');
    return null;
  }
  return (
    <NextLink href={path} passHref>
      <A {...rest}>{children || label}</A>
    </NextLink>
  );
}



export function LearnMore({ path, label, children, ...rest }) {
  if (!path) {
    console.error('LearnMore component requires a valid `path` prop.');
    return null;
  }
  return (
    <NextLink href={path} passHref>
      <A sx={styles.learnMore} {...rest}>
        {children || label || 'Learn More'} <HiOutlineChevronRight />
      </A>
    </NextLink>
  );
}

const styles = {
  learnMore: {
    color: 'link',
    cursor: 'pointer',
    fontWeight: 500,
    display: 'inline-flex',
    alignItems: 'center',
    svg: {
      transition: 'margin-left 0.3s ease-in-out',
      ml: '3px',
    },
    ':hover': {
      svg: {
        ml: '8px',
      },
    },
  },
};
