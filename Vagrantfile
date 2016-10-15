# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/precise64"

  #config.vm.box_url = "http://files.vagrantup.com/precise32.box"

  #config.vm.synced_folder "F:\\GUILHERME\\Projetos\\guilherme\\dashup", "/home/guilherme/dashup"

  config.vm.provider :virtualbox do |vb|
    vb.customize ["modifyvm", :id, "--memory", "512"]
    vb.customize ["modifyvm", :id, "--cpus", "1"]
    vb.customize ["modifyvm", :id, "--ioapic", "on"]
    # vb.gui = false   
  end

end
