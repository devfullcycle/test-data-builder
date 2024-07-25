import { Address } from '../../entities';
import { AddressFakeBuilder } from '../address-fake.builder';

describe('AddressFakeBuilder Tests', () => {
  
  test('withId should set id', () => {
    const id = 10;
    const address = AddressFakeBuilder.anAddress().withId(id).build();
    expect(address.id).toBe(id);
  });

  test('withAddress should set address', () => {
    const address = 'Rua das Flores';
    const addressObj = AddressFakeBuilder.anAddress().withAddress(address).build();
    expect(addressObj.address).toBe(address);
  });

  test('withNumber should set number', () => {
    const number = 10;
    const address = AddressFakeBuilder.anAddress().withNumber(number).build();
    expect(address.number).toBe(number);
  });

  test('withCity should set city', () => {
    const city = 'São Paulo';
    const address = AddressFakeBuilder.anAddress().withCity(city).build();
    expect(address.city).toBe(city);
  });

  test('withState should set state', () => {
    const state = 'SP';
    const address = AddressFakeBuilder.anAddress().withState(state).build();
    expect(address.state).toBe(state);
  });

  test('withZipCode should set zipCode', () => {
    const zipCode = '12345-678';
    const address = AddressFakeBuilder.anAddress().withZipCode(zipCode).build();
    expect(address.zipCode).toBe(zipCode);
  });

  test('withAdditionalInfo should set additionalInfo', () => {
    const additionalInfo = 'Apto 123';
    const address = AddressFakeBuilder.anAddress().withAdditionalInfo(additionalInfo).build();
    expect(address.additionalInfo).toBe(additionalInfo);
  });

  test('withNeighborhood should set neighborhood', () => {
    const neighborhood = 'Centro';
    const address = AddressFakeBuilder.anAddress().withNeighborhood(neighborhood).build();
    expect(address.neighborhood).toBe(neighborhood);
  });

  test('build should create an instance of Address', () => {
    const address = AddressFakeBuilder.anAddress().build();
    expect(address).toBeInstanceOf(Address);
  });

});