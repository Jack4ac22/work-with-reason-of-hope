import Iframe from 'react-iframe'

export default function LinkLayover({ layoverObject }) {
  return (
    <Iframe
      url={layoverObject.link}
      width="100%"
      height='100%'
      className='rounded-2xl'
      loading='eager'
      scrolling='yes'
    />

  );
}