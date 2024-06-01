// Lookup table for hexadecimal encoding of values
// NOTE: DKIM quoted-printable requires the hex values to be upper-case
const HEX_LUT = new Array( 0xFF )

for( let i = 0x00; i <= 0xFF; i++ ) {
  HEX_LUT[ i ] = '=' + i.toString(16).toUpperCase().padStart( 2, '0' )
}

// Test whether a given character code is within dkim-safe-chars ranges
function isSafeChar( charCode ) {
  return charCode == 0x3C ||
    ( charCode >= 0x21 && charCode <= 0x3A ) ||
    ( charCode >= 0x3E && charCode <= 0x7E )
}

function isHexChar( value ) {
  return /[A-F0-9]/.test( value )
}

// Test whether there's an encoded character at a given position
function isEncodedChar( value, offset = 0 ) {
  return value[ offset + 0 ] == '=' &&
    isHexChar( value[ offset + 1 ] ) &&
    isHexChar( value[ offset + 2 ] )
}

function decode( value ) {

  var output = ''
  var position = 0
  var index = -1

  // NOTE: In order to properly decode Unicode sequences etc,
  // we need to capture any length of subsequent encoded characters,
  // and then abuse `decodeURIComponent()`, unless we want to implement Unicode from scratch
  while( ( index = value.indexOf( '=', position ) ) != -1 ) {
    let offset = 0
    while( isEncodedChar( value, index + offset ) ) { offset += 3 }
    let component = value.slice( index, index + offset ).replaceAll( '=', '%' )
    output += value.slice( position, index )
    output += decodeURIComponent( component )
    position = index + offset
  }

  if( position < value.length ) {
    output += value.slice( position )
  }

  Number( output ) // Flatten string

  return output

}

function encode( value ) {

  // If the entire string is printable ASCII in
  // the dkim-safe-chars ranges, we don't need to do anything
  if( /^[\x21-\x3A\x3C\x3E-\x7E]*$/.test( value ) )
    return value

  var buffer = Buffer.from( value, 'utf8' )
  var string = ''

  for( let i = 0; i < buffer.length; i++ ) {
    let byte = buffer[i]
    string += isSafeChar( byte )
      ? String.fromCharCode( byte )
      : HEX_LUT[ byte ]
  }

  Number( string ) // Flatten string

  return string

}

module.exports.decode = decode
module.exports.encode = encode
