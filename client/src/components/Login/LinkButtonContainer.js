import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    formContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "2vh 5vw 0 0"
      }
}));

const LinkButtonContainer = (props) => {
    const classes = useStyles();
    
    return (
        <Grid item className={classes.formContainer}>
                {props.children}
        </Grid>
    );
  };
  
  export default LinkButtonContainer;
  