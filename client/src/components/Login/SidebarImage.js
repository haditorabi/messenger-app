import { Avatar, Box, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    backgroundContainer: {
      backgroundImage: `linear-gradient(to bottom, rgba(58,141,255,0.85),rgb(134,185,255,0.85)),url(./assets/img/bg-img.png)`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    },
    backgroundText: {
      flexDirection: "column",
      color: "white",
      textAlign: "center"
    }
  }));
const SidebarImage = () => {
    const classes = useStyles();
    return (
    <Grid item sm={4} md={4} className={classes.backgroundContainer}>
        <Box display={{ xs: "none", sm: "block", md: "block" }}>
            <Avatar alt={'converse anywhere'} src={"./assets/img/bubble.svg"} ></Avatar>
        </Box>
        <Box
        component='span'
        display={{ xs: "none", sm: "block", md: "block" }}
        m={1}
        />
        <Box
        component='grid'
        display={{ xs: "none", sm: "flex", md: "flex" }}
        className={classes.backgroundText}
        >
            <Typography component='h4' variant='h4'>
            Converse with anyone
            </Typography>
            <Typography component='h4' variant='h4'>
            with any language
            </Typography>
        </Box>
    </Grid>        
      
    );
  };
  
  export default SidebarImage;
  