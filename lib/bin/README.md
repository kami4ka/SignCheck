# CheckSign #

CheckSign win utility for CheckSign project

### Usage
You can launch CheckSign from connad line as following:

`CheckSign path_to_file_to_check_code_signing`

As a result CheckSign utility returns one of the followign codes: <br>
-1 - path parameter missed <br>
 0 - file is signed and the signature was verified <br>
 1 - file is not signed <br>
 2 - unknown error occurred trying to verify the signature <br>
 3 - signature is present, but specifically disallowed <br>
 4 - signature is present, but not trusted <br>
 5 - no signature, publisher or timestamp errors <br>
 6 - other errors <br>