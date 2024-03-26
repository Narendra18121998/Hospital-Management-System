import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className='container biography'>
        <div className="banner">
          <img src={imageUrl} alt="about" />
        </div>

        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque expedita, non sequi molestiae suscipit ex nisi, dolorem, voluptates aperiam deleniti tempora similique nemo reiciendis impedit at sit consequatur aliquid doloribus vero. Ipsum iusto ducimus aliquam sint quia rem iste, non porro, voluptatibus autem vel, illo magni perspiciatis obcaecati pariatur? Consequuntur.
          </p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <p>Lorem ipsum dolor sit amet.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus quae nesciunt aspernatur, placeat sed at, sit maxime quo cumque, incidunt asperiores ipsum corrupti fugit excepturi necessitatibus amet dolorum reiciendis. Harum sunt beatae iusto hic aliquam.</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod, praesentium.</p>
          <p>Lorem, ipsum dolor.</p>
        </div>
      </div>
    </>
  )
}

export default Biography



