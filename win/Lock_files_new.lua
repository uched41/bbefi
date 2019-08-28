--[[_____________________________________________________________________
 |                                                                       |
 |                           Copyright © 2019                            |
 |                           Echo Allied                                 |
 |                    	     bobby beason	                         |
 |                        			                         |
 |______________________________________________________________________]]

-- Sample script to update some file properties in the default file.
--Dodge Lock files for Auto Cal
-- arg 0 is the stock file
-- arg 1 is the 2nd arg and name of file to be saved
-- arg 3 serial # of the device to be flashed with add 00 to the begining if v2
-- arg 4 is the controller serial number



fileId = 0

newProps = {
  [fpidCtrlVIN]      = EFI_Args[2], -- Set the file's VIN to this value
  [fpidSecCtrlVin]   = EFI_Args[2], -- set vin here
  [fpidSecFlashMode] = 2,                   -- 0 = both flash mode 1 = cal-flash only  2 = full flash only
  [fpidSecDevSer]    = EFI_Args[3],      -- File can only be flashed by this device
  [fpidSecCtrlSer]   = EFI_Args[4],       -- File can only be flashed into a controller with this serial
  [fpidRemCumminsMode] = 1, --Remote cummins fast mode 0=Normal,1=unlimited, 2=fast
}

r = _efiSetFileProp(fileId,newProps)
if ( r==nil ) then
  print(string.format("Can't set properties, %s",EFI_ErrMsg))
  return(EFI_ErrNum)
end
print("Properties updated OK")

-- Save the file as "NewFile.ctz" for AutoCal.
-- The third argument determines if it is saved "for AutoCal" or not.
r = _efiSaveFile(fileId,EFI_Args[1],forAutoCal)
if ( r==nil ) then
  if ( EFI_ErrNum==tleNoSaveDefault ) then
    -- If file is open in the EFILive V8 software then it can't be saved by the script
    --   user must save the faile later.
    print("File has been modified, don't forget to save the file.")
  else
    print(string.format("Can't save file, %s",EFI_ErrMsg))
    return(EFI_ErrNum) -- return error number to command line
  end
else
  -- If success, then print "OK".
  print("File Saved OK.")
end
return(0)