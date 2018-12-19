const me = {
  name: 'Joe',
  city: 'Beijing'
};

const { name, ...rest } = me;

rest.city.should.equal('Beijing');
