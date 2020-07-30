import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Media,
  Button
} from 'reactstrap';


const items = [
  {
    src:
      'https://svd.vgc.no/v2/images/32664503-e965-4d1c-b05d-04abb6d691a8?h=560&q=80&upscale=true&w=995&s=431ab809664bd8bcda30e44489cff83d0ca137f9',
    altText: 'Slide 1',
    caption: 'Slide 1',
  },
  {
    src: 'https://content.presspage.com/uploads/1376/1920_booking.comwomenintechmentorprogramatwebsummit4.jpg?10000',
    altText: 'Slide 2',
    caption: 'Slide 2',
  },
  {
    src: 'https://www.traveldailymedia.com/assets/2018/05/women-in-tech2-e1526974561902.png',
    altText: 'Slide 3',
    caption: 'Slide 3',
  },
  {
    src: 'https://www.womenintech.se/wp-content/uploads/2018/01/aboutwit-1024x438.png',
    altText: 'Slide 4',
    caption: 'Slide 4',
  },

];

const Login = props => {
  // Navbar state
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // Carousel state
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map(item => {
    return (
      <CarouselItem onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} key={item.src}>
        <img src={item.src} alt={item.altText} height='500vh' />
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    );
  });

  return (
    <div className='login'>
      <header className="login__header">
      <p className="div1">What is the need? Mentoring focused for the tech sector. Who is it for? Women in tech.</p>
      </header>

      <h1>Welcome to WeMentor.</h1>
      <br></br>

      <Button color="primary" href="http://localhost:4000/login">Sign in with Linkedin</Button>
      <br></br>
      <br></br>

      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction='prev' directionText='Previous' onClickHandler={previous} />
        <CarouselControl direction='next' directionText='Next' onClickHandler={next} />
      </Carousel>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <article className='media'>
        <Media>
          <section className='media__image'>
            <Media >
              <Media
                object
                src='https://medier.talentum.com/ponIltIpIv-1551084951/media/Nyteknik/yc2397-Jessica-Mitrosbaras-Nataly-Duyko-700-394-ny-teknik.jpg/alternates/FREE_320/Jessica-Mitrosbaras-Nataly-Duyko-700-394-ny-teknik.jpg'
                height='250vh'
              />
            </Media>
          </section>
          <section className='media__text'>
            <Media body>
              <Media heading>Media heading</Media>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac semper libero. Nam iaculis lobortis lacinia. Mauris eleifend, sem vel fringilla porta, orci odio vulputate sapien, tincidunt lobortis dui justo ut purus. Sed vel vestibulum urna, vel fermentum urna. Suspendisse lobortis fermentum orci, sit amet lacinia nibh accumsan sit amet. Mauris eleifend, sem vel fringilla porta, orci odio vulputate sapien, tincidunt lobortis dui justo ut purus.
            </Media>
          </section>
        </Media>
      </article>

      <br></br>
        
      <article className='media'>

        <Media>
        <section className='media__text'>
            <Media body>
              <Media heading>Media heading</Media>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac semper libero. Nam iaculis lobortis lacinia. Mauris eleifend, sem vel fringilla porta, orci odio vulputate sapien, tincidunt lobortis dui justo ut purus. Sed vel vestibulum urna, vel fermentum urna. Suspendisse lobortis fermentum orci, sit amet lacinia nibh accumsan sit amet. Mauris eleifend, sem vel fringilla porta, orci odio vulputate sapien, tincidunt lobortis dui justo ut purus.
            </Media>
          </section>
          <section className='media__image'>
            <Media >
              <Media
                object
                src='https://www.womenintech.se/wp-content/uploads/2018/01/aboutwit-1024x438.png'
                height='250vh'
              />
            </Media>
          </section>
          
        </Media>
        </article>
    </div>
  );
};

export default Login;