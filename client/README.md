# SSL
To work with https, we need to install a ssl

0. mkdir ssl

1. In the PowerShell window, run the following command to set the execution policy:
```
Set-ExecutionPolicy Bypass -Scope Process -Force
```

2.Then, run the following command to download and install Chocolatey
```
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

3.Verify installation
```choco -v```

4. On this site https://github.com/FiloSottile/mkcert follow instructions to install mkcert
on windows run this command
```choco install mkcert```

5. Run ```mkcert -install```

6. ```mkcert localhost```

7.in angular.json uncer "serve" section add:
```
  "options": {
    "sslCert": "ssl/localhost.pem",
    "sslKey": "ssl/localhost-key.pem",
    "ssl": true
  },
```
