import React from 'react';

const Card = (props) => {
  const { name , email , id } = props;
  return(
    <div className='tc bg-light-green dib br3 pa3 grow ma2 bw2 shadow-5'>
      <img alt='robots' src={`https://robohash.org/${id}`}/>
      <div>
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
    </div>
  );
}

export default Card