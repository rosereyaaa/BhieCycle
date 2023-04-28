import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';

const ImageBackdrop = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: '#000',
  opacity: 0.5,
  transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: 0,
  borderRadius: 0,
  height: '40vh',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover': {
    zIndex: 1,
  },
  '&:hover .imageBackdrop': {
    opacity: 0.15,
  },
  '&:hover .imageMarked': {
    opacity: 0,
  },
  '&:hover .imageTitle': {
    border: '4px solid currentColor',
  },
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  '& .imageMarked': {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const images = [
  {
    url: 'https://cdn.shopify.com/s/files/1/0989/0486/files/IMG_5284_copy_2048x2048.jpg?v=1613255134',
    title: 'Bicycle',
    width: '40%',
  },
  {
    url: 'https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_375,q_auto:eco,dpr_2,f_auto,fl_progressive/image/diy/e1dd541a-87fa-46bd-a799-cdda41215d4c.jpg',
    title: 'Healthy Lifestyle',
    width: '20%',
  },
  {
    url: 'https://cdn.outsideonline.com/wp-content/uploads/2020/11/19/cyclist-lens-flare_h.jpg?',
    title: 'Cycling',
    width: '40%',
  },
  {
    url: 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/12/Woman-Riding-Rented-Bicycle-In-A-City.-Cycling-and-smiling-1296x728-header-1296x728.jpg?w=1155&h=1528',
    title: 'Explore',
    width: '38%',
  },
  {
    url: 'https://ca-times.brightspotcdn.com/dims4/default/6c34ef6/2147483647/strip/false/crop/1166x656+0+0/resize/1200x675!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F4c%2F3f%2F56cbe14246669dbe9f671b7e8ef6%2Fbike.JPG',
    title: 'Dynamics',
    width: '38%',
  },
  {
    url: 'https://ids.si.edu/ids/deliveryService?max_w=800&id=NMAH-98-942',
    title: 'Velocipede',
    width: '24%',
  },
  {
    url: 'https://www.montaguebikes.com/wp-content/uploads/2019/06/bicycle-wheels-misc-bw.jpg',
    title: 'Wheels',
    width: '40%',
  },
  {
    url: 'https://cdn.road.cc/sites/default/files/2020-circe-cycles-eos-tandem-1-riding.jpg',
    title: 'Tandem',
    width: '20%',
  },
  {
    url: 'https://philiplochner.ghost.io/content/images/2020/03/7-reasons-why-every-cyclist-should-get-cycling-insurance-WEB.jpg',
    title: 'Cyclist',
    width: '40%',
  },
];

export default function ProductCategories() {
  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        Ride your Bicycle!
      </Typography>
      <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            style={{
              width: image.width,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
                backgroundImage: `url(${image.url})`,
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'common.white',
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className="imageTitle"
              >
                {image.title}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
    </Container>
  );
}
