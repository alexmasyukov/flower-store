this.props.save(data)
  .then(() => {
    this.props.history.push(`/${this.props.city}/team`)
  })

to={`${window.location.pathname}/add`}