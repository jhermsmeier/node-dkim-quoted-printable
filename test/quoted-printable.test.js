const assert = require( 'node:assert' )
const qp = require( '../lib/quoted-printable' )

context( 'DKIM Quoted Printable', () => {

  context( 'encode()', () => {

    test( 'ascii', () => {
      var input = 'A==32'
      var expected = 'A=3D=3D32'
      assert.strictEqual( qp.encode( input ), expected )
    })

    test( 'umlaut', () => {
      var input = 'äöü'
      var expected = '=C3=A4=C3=B6=C3=BC'
      assert.strictEqual( qp.encode( input ), expected )
    })

    test( 'emoji', () => {
      var input = '😭'
      var expected = '=F0=9F=98=AD'
      assert.strictEqual( qp.encode( input ), expected )
    })

  })

  context( 'decode()', () => {

    test( 'ascii', () => {
      var input = 'A=3D=3D32'
      var expected = 'A==32'
      assert.strictEqual( qp.decode( input ), expected )
    })

    test( 'umlaut', () => {
      var input = '=C3=A4=C3=B6=C3=BC'
      var expected = 'äöü'
      assert.strictEqual( qp.decode( input ), expected )
    })

    test( 'emoji', () => {
      var input = '=F0=9F=98=AD'
      var expected = '😭'
      assert.strictEqual( qp.decode( input ), expected )
    })

  })

})
