function flash_movie(src, ids, width, height, wmode)
{
    return "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0' width="+width+" height="+height+" id="+ids+"><param name=wmode value="+wmode+"><param name=movie value="+src+"><param name=quality value=high><param name=allowScriptAccess value=always> <embed src="+src+" quality=high wmode="+wmode+" type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/shockwave/download/index.cgi?p1_prod_version=shockwaveflash' width="+width+" height="+height+"></embed></object>";
}

function doc_write(cont)
{
    document.write(cont);
}


