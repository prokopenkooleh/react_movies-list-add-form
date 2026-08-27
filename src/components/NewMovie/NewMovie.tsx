import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const isValid = (value: string) => {
    return pattern.test(value);
  };

  const [count, setCount] = useState(0);

  const [inputTitle, setinputTitle] = useState('');

  const [inputDescr, setinputDescr] = useState('');

  const [inputImgUrl, setinputImgUrl] = useState('');

  const [inputImdbUrl, setinputImdbUrl] = useState('');

  const [inputImdbId, setinputImdbId] = useState('');

  const [submitAttempted, setSubmitAttempted] = useState(false);

  const isFormValid = Boolean(
    inputTitle.trim() &&
      isValid(inputImgUrl) &&
      isValid(inputImdbUrl) &&
      inputImdbId.trim(),
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const hasEmptyFields = [
      inputTitle,
      // inputDescr,
      inputImgUrl,
      inputImdbUrl,
      inputImdbId,
    ].some(value => !value.trim());

    const hasInvalidUrls = [inputImgUrl, inputImdbUrl].some(
      value => !isValid(value),
    );

    if (hasEmptyFields || hasInvalidUrls) {
      setSubmitAttempted(true);

      return;
    }

    onAdd({
      title: inputTitle,
      description: inputDescr,
      imgUrl: inputImgUrl,
      imdbUrl: inputImdbUrl,
      imdbId: inputImdbId,
    });

    setCount(prevCount => prevCount + 1);

    setinputTitle('');
    setinputDescr('');
    setinputImgUrl('');
    setinputImdbUrl('');
    setinputImdbId('');

    setSubmitAttempted(false);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={inputTitle}
        onChange={setinputTitle}
        submitAttempted={submitAttempted}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={inputDescr}
        onChange={setinputDescr}
        submitAttempted={submitAttempted}
        required
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={inputImgUrl}
        onChange={setinputImgUrl}
        submitAttempted={submitAttempted}
        required
        validate={isValid}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={inputImdbUrl}
        onChange={setinputImdbUrl}
        submitAttempted={submitAttempted}
        required
        validate={isValid}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={inputImdbId}
        onChange={setinputImdbId}
        submitAttempted={submitAttempted}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={!isFormValid}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
