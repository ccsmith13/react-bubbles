import React, { useState } from "react";
import axios from "axios";
import { red } from "color-name";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }, props) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };


  const saveEdit = e => {

    e.preventDefault();

    let token = localStorage.getItem("token");
    console.log('token', token);

    let headers = {
      headers: {
        authorization: token
      }
    }

    axios
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit, headers)
      .then(res => {
        //console.log('res  in handleSubmit', res);
        var elementPos = colors.map(function (x) { return x.id; }).indexOf(colorToEdit.id);
        let newColorsList = colors.slice();
        newColorsList[elementPos] = res.data;
        updateColors(newColorsList)
      })
      .catch(err => {
        console.log(err);
      });
  };


  const deleteColor = color => {
    let token = localStorage.getItem("token");
    let headers = {
      headers: {
        authorization: token
      }
    }
    axios
      .delete(`http://localhost:5000/api/colors/${color.id}`, headers)
      .then(res => {
        //console.log('res', res)
        var elementPos = colors.map(function (x) { return x.id; }).indexOf(res.data);
        let removed = colors.splice(elementPos, 1)
        let newColors = colors.slice()
        updateColors(newColors)
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
