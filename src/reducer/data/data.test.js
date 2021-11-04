import MockAdapter from "axios-mock-adapter";
import {createApi} from "../../api";
import {
  ActionType,
  Operations,
} from "./data";


describe(`Reducer works correctly`, () => {
  it(`Should make a correct API call to /questions`, function () {
    const dispatch = jest.fn();
    const api = createApi(dispatch);
    const apiMock = new MockAdapter(api);
    const questionLoader = Operations.loadQuestions();

    apiMock
      .onGet(`/questions`)
      .reply(200, [{fake: true}]);

    return questionLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_QUESTIONS,
          payload: [{fake: true}],
        });
      });
  });
});
