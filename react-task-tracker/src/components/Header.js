import Button from './Button';

const Header = ({ title, onAdd, showAdd }) => {

  return (
    <>
      <header className="header">
        <h1>{title}</h1>
        <Button
          color={showAdd ? 'red' : 'green'}
          text={showAdd ? 'Close' : 'Add'}  // Updates according to add button's state.
          onClick={onAdd}
        />
      </header>
    </>
  )
}

Header.defaultProps = {
  title: "Task Tracker",
}

// for uses of CSS inside JS
const headingStyle = {
  color: 'orange',
  backgroundColor: 'navy'
}

export default Header