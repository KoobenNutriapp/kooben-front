import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import "./TagsManager.scss";

function TagsManager() {

  const tags=[
    '🤤 delicioso',
    '🐍prehispánico',
    '🏰virreinal',
    '🛰 moderno',
    '🥓 keto',
    '🏖 mediterráneo',
    '🌮mexicana',
    '🗽americano',
    '⛩ asiático',
    '🌍africano',
    '🌏australiano',
    '👳‍♂️árabe',
    '🌍española',
    '🗼francesa',
    '🦐mariscos',
    '🐄🦐🐟🐖 mar y tierra',
    '✅ alto en fibra',
    '✅ bajo en sodio',
    '✅ bajo en grasas',
    '✅ bajo en calorías',
    '✅ contiene omega 3',
    '✅ alto en proteínas',
    '✅ alto en vitamina A',
    '✅ alto en complejo B',
    '✅ bajo en carbohidratos',
    '❌ alto en sodio',
    '❌ alto en calorías',
    '❌ alto en colesterol',
    '❌ contiene grasas trans',
    '❌ alto en carbohidratos',
    '❌ alto en grasas saturadas',

  ]

  const handleChange = (event, value) =>console.log(value);

  return (
    <Autocomplete
      className="tagsBox"
      multiple
      onChange={handleChange}
      limitTags={4}
      id="multiple-limit-tags"
      options={tags}
      getOptionLabel={(option) => option}
      defaultValue={[]}
      renderInput={(params) => (
        <TextField {...params} label="Elige tus tags:" placeholder="Buscar tags"  />
      )}
    />
  );
}

export default TagsManager