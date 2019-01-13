import React from "react";
import { PromiseState } from "react-refetch";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import chai, { expect } from "chai";
import chaiEnzyme from "chai-enzyme";
import FetchComponent from "../src/components/FetchComponent";
import Loader from "react-loader-spinner";
import Error from "../src/components/Error";

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

describe("Fetching component", () => {
  test("Pending rendering", () => {
    const wrapper = shallow(<FetchComponent fetch={PromiseState.create()} />);

    expect(wrapper.find(Loader)).to.have.length(1);
  });

  test("Error rendering", () => {
    const expectedError = new Error("An error occured");

    const wrapper = shallow(
      <FetchComponent fetch={PromiseState.reject(expectedError)} />
    );

    expect(wrapper).to.containMatchingElement(
      <Error message={expectedError.message} />
    );
  });

  test("Success rendering", () => {
    const valueExpected = "it worked !";
    const callbackOnSuccess = valueExpected => {
      return "Yes " + valueExpected;
    };

    const wrapper = shallow(
      <FetchComponent
        fetch={PromiseState.resolve(valueExpected)}
        callbackOnSuccess={fetch => callbackOnSuccess(fetch.value)}
      />
    );

    expect(wrapper.find('div')).to.have.text('Yes it worked !');
  });
});
