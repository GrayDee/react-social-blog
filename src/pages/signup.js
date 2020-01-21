import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png'
import { Link } from 'react-router-dom'

// MUI stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

// Redux stuff
import { connect } from 'react-redux'
import { signupUser } from '../redux/actions/userActions'

const styles = (theme) => ({
  form: {
    textAlign: 'center'
  },
  image: {
    margin: '20px auto 20px auto',
    width: '100px',
    height: '100px'
  },
  pageTitle: {
    margin: '10px auto 10px auto'
  },
  textField: {
    margin: '10px auto 10px auto'
  },
  button: {
    marginTop: 20,
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  },
  progress: {
    position: 'absolute'
  }
})


class Signup extends Component {
  constructor(){
    super()
    this.state = {
      email: '',
      password: '',
      comfirmPassword: '',
      handle: '',
      loading: false,
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.UI.errors){
      this.setState({ errors: nextProps.UI.errors })
    }
  }
  
  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      loading: true
    })
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.comfirmPassword,
      handle: this.state.handle
    }
    this.props.signupUser(newUserData, this.props.history)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { classes, UI: { loading } } = this.props
    const { errors } = this.state
    return (
      <Grid container className={classes.form} spacing={1}>
        <Grid item sm/>
        <Grid item sm> 
          <img src={AppIcon} alt="Zoro" className={classes.image}/>
          <Typography variant="h2" className={classes.pageTitle}>
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField 
              id="email" name="email" type="email" label="Email" className={classes.textField} helperText={errors.email} 
              error={errors.email ? true : false}
              value={this.state.email} onChange={this.handleChange} fullWidth />
            <TextField 
              id="password" name="password" type="password" label="Password" className={classes.textField} helperText={errors.password} 
              error={errors.password ? true : false}
              value={this.state.password} onChange={this.handleChange} fullWidth />
            <TextField 
              id="comfirmPassword" name="comfirmPassword" type="password" label="Comfirm Password" className={classes.textField} helperText={errors.comfirmPassword} 
              error={errors.comfirmPassword ? true : false}
              value={this.state.comfirmPassword} onChange={this.handleChange} fullWidth />
            <TextField 
              id="handle" name="handle" type="text" label="Handle" className={classes.textField} helperText={errors.handle} 
              error={errors.handle ? true : false}
              value={this.state.handle} onChange={this.handleChange} fullWidth />

            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
              Signup
              {loading && (
                <CircularProgress size={30} className={classes.progress}/>
              )}
            </Button>
            <br/>
            <small>Already have an account ? login <Link to="/signup">here</Link></small>
          </form>
        </Grid>
        <Grid item sm/>
      </Grid>
    )
  }
}

Signup.propTypes ={
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
})

const mapActionToProps = ({
  signupUser
})

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Signup))


