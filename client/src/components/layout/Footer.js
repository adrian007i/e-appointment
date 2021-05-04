import React from 'react';

export default function Footer() {
  // a footer is not required at the moment in current UI design
  return (
    <footer className='bg-black footer white py-1'>
      <small className='ml-2'>Copyright &copy; {(new Date().getFullYear())} COSTAATT Code Innovators HackTT Team.</small>
    </footer>
  );
}