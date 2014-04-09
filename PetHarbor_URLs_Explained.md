A way to use a zip code and radius to get the list of dogs or cats in the area

1) URL example - Searching adoption places within 10 miles. This gets the shelter list. http://www.petharbor.com/search.asp?searchtype=ADOPT&ZIP=80209&MILES=10

2) That last URL will return a large page of shelter checkboxes. Several ways to scrape this HTML for a list of shelters. one portion of the return looks like this. if(document.frmPickShelter.chkARAP.checked){ if (sShelterList != ""){sShelterList = sShelterList + ","}sShelterList = sShelterList + "'ARAP'"} if(document.frmPickShelter.chkAURO.checked){ if (sShelterList != ""){sShelterList = sShelterList + ","}sShelterList = sShelterList + "'AURO'"} if(document.frmPickShelter.chkPKPK2.checked){ if (sShelterList != ""){sShelterList = sShelterList + ","}sShelterList = sShelterList + "'PKPK2'"} if(document.frmPickShelter.chkDNVR.checked){ if (sShelterList != ""){sShelterList = sShelterList + ","}sShelterList = sShelterList + "'DNVR'"} if(document.frmPickShelter.chkDDFL.checked){ if (sShelterList != ""){sShelterList = sShelterList + ","}sShelterList = sShelterList + "'DDFL'"}

3) Once you have the shelter list you can get to a list of dogs. rows=1000 should be enough to get a page with all of them from a large area. http://www.petharbor.com/results.asp?searchtype=ADOPT&stylesheet=include/default.css&frontdoor=1&friends=1&samaritans=1&nosuccess=0&rows=1000&imght=120&imgres=thumb&view=sysadm.v_animal&fontface=arial&fontsize=10&zip=80209&miles=10&shelterlist='PKPK2','DNVR','DDFL'&atype=&where=type_DOG&PAGE=1

4) After you have a petID there's a quick URL to the pet with two keys (PetID & Shelter)
http://www.petharbor.com/pet.asp?uaid=DDFL.A0426795
