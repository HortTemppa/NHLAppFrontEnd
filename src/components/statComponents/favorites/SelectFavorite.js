import React from 'react'

const SelectFavorite = ({favorites, handleChange}) => {


    return <select defaultValue = "default"  onChange={handleChange} className="Select" style = {{fontSize: "12px"}}>
    {<option value = "default" disabled hidden>
      Select favorite
</option>}
    {favorites.map((favorite, index) => {
      if (!favorite) {
        return null;
      }
      return <option key = {index} value={index}>{favorite.name}</option>;
    })}
  </select>
}

export default SelectFavorite