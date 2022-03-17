import React from 'react';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';

import Footer from '../Footer/Footer';
import { Input, Button } from '../../Components';
import './search.scss';

const Item = (props) => {
  return (
    <>
      <div className="item" key={props?.key} onClick={() => props.onClick()}>
        <div className="text" dangerouslySetInnerHTML={{ __html: `<p >${props.text}</p>` }} />
        <div className="ic-found">
          <CheckCircleIcon />
        </div>
      </div>
    </>
  );
};

const Search = (props) => {
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState('');
  const [selected, setSelected] = React.useState(null);
  const [wordToFind, setWordToFind] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const find = (word) => {
    setLoading(true);
    fetch(`${props?.connection.url}${word}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.text().then((text) => {
          throw new Error(text);
        });
      })
      .then((res) => {
        setLoading(false);

        setOptions(res);
      })
      .catch((err) => {
        setLoading(false);

        setOptions([]);
        console.log(err);
      });
  };
  return (
    <>
      <div className="search-wrapper">
        {value === '' ? (
          <Input
            placeholder="Escriba su actividad económica"
            onChange={(e) => {
              find(e.target.value);
              setValue(value);
              setSelected(null);
              setWordToFind(e.target.value);
            }}
            iconRight={<SearchIcon />}
            onClick={() => {
              setValue('');
            }}
          />
        ) : (
          <Input
            placeholder="Escriba su actividad económica "
            defaultValue={value}
            value={value}
            onChange={(e) => {
              find(e.target.value);
              setValue(value);
              setSelected(null);
              setWordToFind(e.target.value);
            }}
            onClick={() => {
              setValue('');
            }}
            iconRight={<SearchIcon />}
          />
        )}
        {loading ? (
          <div className="loading">
            <CircularProgress />
          </div>
        ) : (
          <>
            {options.length > 0 && selected === null ? (
              <div className="found-wrapper">
                {options.map((data, i) => {
                  const text = data.descriptionEs.replace(
                    wordToFind,
                    `<span class='higthlight'>${wordToFind}</span>`
                  );

                  return (
                    <>
                      <Item
                        text={text}
                        key={`item-search-${data.id}`}
                        onClick={() => {
                          setValue(data.descriptionEs);
                          setSelected(data);

                          props?.onChange(data);
                        }}
                      />
                    </>
                  );
                })}
              </div>
            ) : (
              <>
                {selected !== null ? (
                  <>
                    <div className="selected-wrapper">
                      <p className="text">{selected?.descriptionEs}</p>

                      <div className="ic-selected">
                        <CheckCircleIcon />
                      </div>
                    </div>
                  </>
                ) : null}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default Search;
