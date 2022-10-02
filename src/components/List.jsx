import "./List.css";

export default function List({ list, deleteItem }) {
  const MAX_TEXT_LENGHT = 23;

  const showMore = (e, text) => {
    e.target.innerText = text;
  };

  const showLess = (e, text) => {
    e.target.innerText = text.slice(0, MAX_TEXT_LENGHT) + "...";
  };

  const listItems = list.map((item) => (
    <li key={item.id}>
      <div>
        {item.text.length < MAX_TEXT_LENGHT ? (
          <p>{item.text}</p>
        ) : (
          <button
            className="hidden-content-btn"
            onClick={(e) => {
              showMore(e, item.text);
            }}
            onBlur={(e) => {
              showLess(e, item.text);
            }}
          >
            {item.text.slice(0, MAX_TEXT_LENGHT)}...
          </button>
        )}

        <button className="delete-item-btn"
          onClick={() => {
            deleteItem(item.id);
          }}
        >
          X
        </button>
      </div>
    </li>
  ));

  return <ul className="List">{listItems}</ul>;
}
