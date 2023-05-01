import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import background from "../views/background/Header.gif";

// const background =
//   "https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000";

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${background})`,
        backgroundColor: 'white', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'initial', zindex:-1, width:1349, height:700, margin:20}}
        src={background}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
        Feeling alive only on two wheels.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/register"
        sx={{ minWidth: 200 }}
      >
        Register
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the fun.
      </Typography>
    </ProductHeroLayout>
  );
}
