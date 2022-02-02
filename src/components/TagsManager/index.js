import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import "./TagsManager.scss";

function TagsManager({tags}) {
  console.log(tags);

  const handleChange = (event, value) =>console.log(value);

  return (
    <Autocomplete
      className="tagsBox"
      multiple
      onChange={handleChange}
      limitTags={4}
      id="multiple-limit-tags"
      options={tags}
      getOptionLabel={(option) => option.label}
      defaultValue={[tags[0], tags[1], tags[2], tags[3]]}
      renderInput={(params) => (
        <TextField {...params} label="Elige tus tags:" placeholder="Buscar tags"  />
      )}
    />
  );
}

export default TagsManager