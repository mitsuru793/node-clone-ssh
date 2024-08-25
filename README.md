# clone-ssh-url

You can generate url for ssh from github repository. This is useful when you can switch account with ssh.

```
git clone $(clone-ssh-url --domain-prefix mike. https://github.com/mike/repo)

git clone $(npx --package=@mitsuru793/clone-ssh clone-ssh-url)
```

## How to use

```shell
clone-ssh-url https://github.com/mike/repo
# => git@github.com:mike/repo.git

clone-ssh-url --domain example.com https://github.com/mike/repo
# => git@example.com:mike/repo.git

clone-ssh-url --domain-prefix pre. https://github.com/mike/repo
# => git@pre.example.com:mike/repo.git
```

You can pass others, but not only http url of github repository.

```shell
clone-ssh-url --domain-prefix pre. git@github.com:mike/repo.git
# => git@pre.github.com:mike/repo.git

clone-ssh-url --domain-prefix pre. mike/repo
# => git@pre.github.com:mike/repo.git
#      default domain is github.com
```